export class RecommendationCandidateDto {
    private constructor(
        public readonly filters: {
            groups: Array<{
                filters: Array<{ field?: string, operator?: string, value?: any }>,
                operator: string
            }>
        },
        public readonly page: number,
        public readonly page_size: number
    ) {}

    static create(obj: { [key: string]: any }): [string?, RecommendationCandidateDto?] {
        const page = obj.page;
        const page_size = obj.page_size;
        const groups = obj.filters?.groups || [];

        if (typeof page !== 'number' || page < 0) {
            return ["page must be a positive number", undefined];
        }

        if (typeof page_size !== 'number' || page_size < 0) {
            return ["page_size must be a positive number", undefined];
        }

        const parsedGroups = groups.map((group: any) => ({
            filters: (group.filters || []).map((f: any) => ({
                field: f.field,
                operator: f.operator,
                value: f.value
            })),
            operator: group.operator || "and"
        }));

        return [undefined, new RecommendationCandidateDto(
            { groups: parsedGroups },
            page,
            page_size
        )];
    }
}
