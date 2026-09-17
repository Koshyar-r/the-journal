import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import slugify from "slugify";
import prisma from "@/lib/prisma";
import { CloudinaryUploadResult, uploadToCloudinary } from "@/services/cloudinary";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession(
            { headers: await headers() }
        )

        if (!session?.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const excerpt = formData.get("excerpt") as string;
        const coverImage = formData.get("coverImage") as File;

        if (!title || !coverImage || !excerpt || !content) {
            return NextResponse.json(
                { error: "All fields are required!" },
                { status: 400 }
            );
        }

        const baseSlug = slugify(title, {
            lower:true,
            strict:true,
            trim:true
        });

        let slug = baseSlug
        let counter = 1

        while (await prisma.post.findUnique({ where: { slug } })) {
            slug = `${slug}-${counter}`;
            counter++;
        }

        const imageData: CloudinaryUploadResult = await uploadToCloudinary(coverImage);

        const post = await prisma.post.create({
            data: {
                title,
                excerpt,
                slug,
                content,
                coverImageURL: imageData.secure_url,
                coverImagePublicId: imageData.public_id,
                authorId: session.user.id,
            },
        });

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);

        const DEFAULT_LIMIT = 3

        const cursor = searchParams.get("cursor");

        const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

        const posts = await prisma.post.findMany({
            take: limit + 1,
            orderBy: { createdAt: "desc" },
            cursor: cursor ? { id: cursor } : undefined,
            skip: cursor ? 1 : 0,
            select: {
                id: true,
                title: true,
                excerpt: true,
                slug: true,
                coverImageURL: true,
                createdAt: true,
            }
        })

        const hasMore = posts.length > limit;

        const items = hasMore ? posts.slice(0, limit) : posts;

        const nextCursor = hasMore ? items[items.length - 1].id : null;

        return NextResponse.json({ posts: items, nextCursor }, { status: 200 });

    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}