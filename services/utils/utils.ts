// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import he from "he";

// ==============================================================

export const decodeHtmlEntities = (html: string): string => {
  return he.decode(html);
};
