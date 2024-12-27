import crypto from "crypto";

export const toGuidId = (auth0StringId: string) => {
  // Compute SHA-1 hash
  const hash = crypto.createHash("sha1").update(auth0StringId, "utf8").digest();

  // Take the first 16 bytes
  const first16Bytes = hash.slice(0, 16);

  // Convert to a GUID format
  const data1 = first16Bytes.readUInt32LE(0).toString(16).padStart(8, "0");
  const data2 = first16Bytes.readUInt16LE(4).toString(16).padStart(4, "0");
  const data3 = first16Bytes.readUInt16LE(6).toString(16).padStart(4, "0");
  const data4 = first16Bytes.slice(8, 10).toString("hex");
  const data5 = first16Bytes.slice(10, 16).toString("hex");

  return `${data1}-${data2}-${data3}-${data4}-${data5}`;
};
