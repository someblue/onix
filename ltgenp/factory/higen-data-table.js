// copy to end of line
// $pj^
//
// become { "n": "xx", "t": "yy"},
// dei{ "n": "pa", "t":lldeA"pA" },j^

{ "n": "iid", "t": "uint64" },
{ "n": "status", "t": "uint64" },
{ "n": "first_type", "t": "uint64" },
{ "n": "second_type", "t": "uint64" },
{ "n": "mod_format", "t": "uint64" },
{ "n": "res_url", "t": "string" },
{ "n": "res_name", "t": "string" },
{ "n": "res_version", "t": "uint64" },
{ "n": "res_md5", "t": "string" },
{ "n": "res_size", "t": "uint64" },
{ "n": "total_star", "t": "uint64" },
{ "n": "remark_num", "t": "uint64" },
{ "n": "download_num", "t": "uint64" },
{ "n": "history_down_count1", "t": "uint64" },
{ "n": "history_down_count2", "t": "uint64" },
{ "n": "history_down_count3", "t": "uint64" },
{ "n": "history_down_count4", "t": "uint64" },
{ "n": "history_down_count5", "t": "uint64" },
{ "n": "history_down_count6", "t": "uint64" },
{ "n": "developer_name", "t": "string" },
{ "n": "info", "t": "string" },
{ "n": "tRefresh", "t": "int64" },
{ "n": "create_time", "t": "int64" }



{
    "full_name": "/hidata/mysql/x19/pe_item",
    "columns": [
        {{ #properties }}
        {
            "name": "{{ n }}",
            "type": "{{ t }}"
        },
        {{ /properties }}
    ],
    "keys": [
        {
            "columns": [
                "tid"
            ],
            "primary_key": true
        }
    ]
}
