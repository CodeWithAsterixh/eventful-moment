import { User } from "@/db/db";

export const users = new User()

export function generateToken() {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };
  
    const payload = {
      sub: crypto.randomUUID(), // Unique identifier
      iat: Math.floor(Date.now() / 1000), // Issued at time
      exp: Math.floor(Date.now() / 1000) + 3600 // Expires in 1 hour
    };
  
    function base64UrlEncode(obj) {
      return btoa(JSON.stringify(obj))
        .replace(/=/g, "") // Remove padding
        .replace(/\+/g, "-") // Replace + with -
        .replace(/\//g, "_"); // Replace / with _
    }
  
    const encodedHeader = base64UrlEncode(header);
    const encodedPayload = base64UrlEncode(payload);
    const signature = base64UrlEncode(
      crypto.getRandomValues(new Uint8Array(32)).toString()
    ); // Fake signature
  
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
  
  