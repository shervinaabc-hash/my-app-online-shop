
import { NextRequest, NextResponse } from 'next/server'


function proxy (request: NextRequest) {
    const token = request.cookies.get("token")?.value
    if(token){
        return NextResponse.next();
    }

    const url = new URL(request.url)
    url.pathname = "/login"

    return NextResponse.redirect(url.toString());
  
}

export const config = {
   matcher : ["/adminPanel/:path*"]
}
export default proxy
