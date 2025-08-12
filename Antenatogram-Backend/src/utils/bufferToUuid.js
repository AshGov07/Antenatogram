// import { stringify } from "uuid";

// export function bufferToUuid(buffer) {
//   try {
//     if (!buffer || !(buffer instanceof Buffer)) return null;
//     return stringify(buffer);
//   } catch (e) {
//     console.error("❌ Failed to convert buffer to UUID:", e);
//     return null;
//   }
// }


import { stringify } from "uuid";

// Fix for MySQL UUID_TO_BIN(uuid, 1)
export function bufferToUuid(buffer) {
  try {
    if (!Buffer.isBuffer(buffer)) {
      console.error("❌ Input is not a Buffer:", buffer);
      return null;
    }

    // Rearrange bytes to match MySQL UUID_TO_BIN(..., 1) format
    const reordered = Buffer.from([
      ...buffer.slice(4, 8),
      ...buffer.slice(2, 4),
      ...buffer.slice(0, 2),
      ...buffer.slice(8)
    ]);

    return stringify(reordered);
  } catch (error) {
    console.error("❌ Failed to convert buffer to UUID:", error);
    return null;
  }
}
