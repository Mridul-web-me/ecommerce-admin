import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"



export async function GET(
    req: Request,
    { params }: {  params: { categoriesId: string, } }

) {
    try {
        
        if(!params.categoriesId){
            return new NextResponse("Category id is required", {status: 400});
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoriesId
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_GET]', error)
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function PATCH(
    req: Request,
     {params} : {params: {storeId: string, categoriesId: string}}

) {
    try {
        const {userId } = auth();
        const body = await req.json();
        const {name, billboardId} = body


        if(!userId){
            return new NextResponse('Unauthorized', {status: 401})
        }
        if(!name){
            return new NextResponse("Label is required", {status: 400});
        }
        if(!billboardId){
            return new NextResponse("Billboard Id is required", {status: 400});
        }

        if(!params.categoriesId){
            return new NextResponse("Category id is required", {status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        const category = await prismadb.category.updateMany({
            where: {
                id:params.categoriesId,
            },
            data: {
              name,
              billboardId
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_PATCH]', error)
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function DELETE(
    req: Request,
     {params} : {params: {storeId: string, categoriesId: string}}

) {
    try {
        const {userId } = auth();


        if(!userId){
            return new NextResponse('Unauthorized', {status: 401})
        }
       

        if(!params.categoriesId){
            return new NextResponse("Category id is required", {status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        const category = await prismadb.category.deleteMany({
            where: {
                id:params.categoriesId,
            }
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_DELETE]', error)
        return new NextResponse("Internal error", {status: 500});
    }
};



