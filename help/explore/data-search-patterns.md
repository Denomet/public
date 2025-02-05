<!-- TITLE: Search Patterns -->
<!-- SUBTITLE: -->

# Search Patterns

Search patterns let you use a commonly accepted notation to specify conditions in free text. Use the same
syntax to query in-memory datasets via the [search mechanism](data-search.md), and to query external 
databases with [parameterized queries](../access/parameterized-queries.md). When querying databases, 
behind the scenes the platform will parse the free-text query, and then execute a parameterized, safe, 
provider-specific SQL query on the backend.

For searching within the in-memory table, patterns can be preceded with column name 
(example: "age > 21"). External query patterns do not allow the column name to be specified, as 
the column name is already specified at the query level.

## Numerical Patterns

| Pattern                | Example    |
|------------------------|------------|
| Exact value            | 5          |
| Greater than           | > 5        | 
| Greater than or equals | >= 5       | 
| Less than              | < 5        |
| Less than or equals    | <= 5       |
| Range (inclusive)      | 10-20      |
| In                     | in (5, 10) |

If the input does not match above-mentioned patterns, 'exact value' search is used.

## String Patterns

| Pattern                | Example             |
|------------------------|---------------------|
| contains               | contains foo        | 
| starts with            | starts with Charles |
| ends with              | ends with District  | 
| regex                  | regex .*\[0-9\]+    | 
| in                     | in (5, 10)          |

String matching is case-insensitive.
If the input does not match above-mentioned patterns, 'exact value' search is used.

## DateTime Patterns

| Pattern                | Example                                       |
|------------------------|-----------------------------------------------|
| 1984                   | years 1984 (ignore date and time)             | 
| 1984-1986              | years 1984, 1985, 1986 (ignore date and time) | 
| June 1984              | June 1984 (ignore date and time)              | 
| Oct 17, 2019           | date = 10/17/2019 (ignore time)               |
| 10/17/2019 5:24 pm     | exact date and time                           | 
| before 10/17/2019      | before the specified date                     |
| after 10/17/2019       | after the specified date                      |
| today                  |                                               |
| this week              |                                               |
| this month             |                                               |
| this year              |                                               |
| yesterday              |                                               |
| last week              |                                               |
| last month             |                                               |
| last year              |                                               |

## Provider Compatibility

| Source                 | Support |
|------------------------|---------|
| Grok in-memory         | +       |                 
| Access                 | +       |                 
| Athena                 | +       |   
| Cassandra              |         |      
| DB2                    | +       |
| Firebird               | +       |     
| HBase                  | +       |  
| Hive                   | +       | 
| Hive2                  | +       |  
| Oracle                 | +       |   
| MariaDB                | +       |    
| MS SQL                 | +       |   
| MongoDB                |         |    
| MySql                  | +       |  
| Postgres               | +       |     
| SQLite                 | +       |   
| Teradata               | +       |     
| Vertica                | +       |    
| Redis                  |         |  
| SPARQL                 | +       |   
| SAP                    |         |
| SAS                    |         |
 

See also:
  * [Data Search](data-search.md)
  * [Parameterized Queries](../access/parameterized-queries.md)
