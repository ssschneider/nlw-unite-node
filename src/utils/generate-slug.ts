export function generateSlug (text: string): string {
    return text
        .normalize("NFD") 
        .replace(/[\u0300-\u36f]/g, "")
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
};