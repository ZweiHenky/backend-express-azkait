export interface CreateCompanyResponse {
    url:                            string;
    id:                             number;
    name:                           string;
    sector:                         null;
    company_sector:                 string;
    business_name:                  string;
    taxpayer_identification_number: string;
    fax:                            string;
    number_of_employees:            null;
    owner:                          string;
    who_can_view:                   number;
    emails:                         any[];
    phones:                         Phone[];
    websites:                       Website[];
    addresses:                      any[];
    rank:                           number;
    rank_manual:                    boolean;
    picture_url:                    null;
    private:                        boolean;
    last_viewed:                    null;
    last_interaction:               null;
    facebook_id:                    string;
    twitter_id:                     string;
    linkedin_id:                    string;
    facebook_url:                   string;
    linkedin_url:                   string;
    twitter_url:                    string;
    won_deals_amount:               number;
    founded:                        null;
    online_since:                   null;
    full_contact_extra:             string;
    approx_employees:               null;
    description:                    string;
    remarks:                        string;
    summary:                        string;
    tags:                           any[];
    deals:                          any[];
    related_tasks:                  any[];
    wall_entries:                   WallEntry[];
    employees:                      any[];
}

export interface Phone {
    phone: string;
}

export interface WallEntry {
    url:            string;
    id:             number;
    user:           string;
    created:        Date;
    extra:          string;
    extra_datetime: null;
    type:           string;
    link:           string;
    source_id:      string;
    object_id:      number;
}

export interface Website {
    website: string;
}
