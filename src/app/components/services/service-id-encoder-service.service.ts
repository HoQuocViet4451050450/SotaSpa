import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class ServiceIdEncoderServiceService {
  private idMap = new Map<number, string>(); // Maps original ID to encoded ID
  private encodedIdMap = new Map<string, number>(); // Maps encoded ID back to original ID

  constructor() {}

  /**
   * Encodes a numeric ID into a random string.
   * If the ID has already been encoded, it returns the existing encoded string.
   * @param originalId The original numeric ID.
   * @returns The encoded random string.
   */
  encodeId(originalId: number): string {
    if (this.idMap.has(originalId)) {
      return this.idMap.get(originalId)!;
    }

    const encodedString = uuidv4(); // Generate a UUID (random string)
    this.idMap.set(originalId, encodedString);
    this.encodedIdMap.set(encodedString, originalId);
    return encodedString;
  }

  /**
   * Decodes a random string back into the original numeric ID.
   * @param encodedId The encoded random string.
   * @returns The original numeric ID, or null if not found.
   */
  decodeId(encodedId: string): number | null {
    return this.encodedIdMap.has(encodedId)
      ? this.encodedIdMap.get(encodedId)!
      : null;
  }
}
