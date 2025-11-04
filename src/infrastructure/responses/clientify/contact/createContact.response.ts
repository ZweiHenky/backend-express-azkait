export interface CreateContactResponse {
    url:                            string;
    id:                             number;
    owner:                          string;
    owner_id:                       number;
    owner_name:                     string;
    first_name:                     string;
    last_name:                      string;
    status:                         string;
    title:                          string;
    company:                        string;
    company_details:                string;
    contact_type:                   null;
    contact_source:                 string;
    emails:                         Email[];
    phones:                         Phone[];
    addresses:                      Address[];
    picture_url:                    null;
    custom_fields:                  any[];
    other_companies:                any[];
    tags:                           string[];
    description:                    string;
    remarks:                        string;
    summary:                        string;
    created:                        Date;
    modified:                       Date;
    last_contact:                   null;
    related_tasks:                  any[];
    deals:                          any[];
    wall_entries:                   WallEntry[];
    page_views:                     number;
    total_visits:                   number;
    first_visit:                    null;
    last_visit:                     null;
    gdpr_accept:                    boolean;
    visitor_key:                    string;
    attachments:                    any[];
    websites:                       any[];
    medium:                         string;
    linkedin_url:                   string;
    linkedin_id:                    string;
    linkedin_picture_url:           string;
    skype_username:                 string;
    birthday:                       null;
    twitter_id:                     string;
    lead_scoring:                   number;
    facebook_url:                   string;
    twitter_url:                    string;
    googleplus_url:                 string;
    pinterest_url:                  string;
    foursquare_url:                 string;
    aboutme_url:                    string;
    klout_url:                      string;
    instagram_url:                  string;
    manychat_url:                   null;
    facebook_picture_url:           string;
    twitter_picture_url:            string;
    facebook_id:                    string;
    google_id:                      string;
    taxpayer_identification_number: string;
    unsubscribed:                   boolean;
    automations:                    any[];
    gdpr_acceptance_date:           Date;
    country:                        string;
    integrations:                   any[];
    disclaimer:                     boolean;
}

export interface Address {
    id:          number;
    type:        number;
    street:      string;
    city:        string;
    state:       string;
    country:     string;
    postal_code: string;
}

export interface Email {
    id:    number;
    type:  number;
    email: string;
}

export interface Phone {
    id:    number;
    type:  number;
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
