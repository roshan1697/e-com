import { NextRequest,NextResponse } from "next/server";
import { products } from "./products_export";

export const GET = async(req:NextRequest) =>{
    return NextResponse.json(
        { data: products},
        { status:200 }
    )

}