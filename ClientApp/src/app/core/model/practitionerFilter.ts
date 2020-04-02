export interface PractitionerFilter {
  SearchText: string;

  Filters: {
    ParentCategory: string;
    ChildCategories: {
      Name: string;
    }[];
  }[];
}
