import NextAuth, {AuthOptions} from "next-auth";
import { authOption } from "../../../../lib/nextAuth";

const handler = NextAuth(authOption)

export {handler as GET, handler as POST}