import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { ceratedAt: 'desc' }
        });

        return NextResponse.json({
            message: 'Videos fetched successfully',
            success: true,
            data: videos
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}