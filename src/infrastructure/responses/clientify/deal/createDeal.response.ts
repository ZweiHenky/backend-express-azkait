export interface CreateDealResponse {
    url:                  string;
    id:                   number;
    owner:                string;
    name:                 string;
    amount:               string;
    contact:              string;
    created:              Date;
    expected_closed_date: Date;
    company:              string;
    source:               null;
    status:               number;
    status_desc:          string;
    probability:          number;
    probability_desc:     string;
    who_can_view:         number;
    pipeline_stage:       string;
    pipeline:             string;
    involved_contacts:    any[];
    tags:                 any[];
    remarks:              string;
    involved_companies:   any[];
    wall_entries:         WallEntry[];
    tasks:                any[];
    events:               any[];
    custom_fields:        any[];
}

export interface WallEntry {
    url:            string;
    id:             number;
    user:           string;
    created:        Date;
    extra:          string;
    extra_datetime: Date;
    type:           string;
    link:           string;
    source_id:      string;
    object_id:      number;
}
