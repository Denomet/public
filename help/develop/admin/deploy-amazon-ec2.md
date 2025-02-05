<!-- TITLE: Deployment on AWS EC2 -->
<!-- SUBTITLE: -->

# Deployment on AWS EC2

This document contains instructions to deploy Datagrok on AWS EC2 instance.

## Prerequisites

1. Configure S3 bucket and RDS database
2. Create t2.medium EC2 instance for Datagrok VM and c5.xlarge from CVM.

## Setup Datagrok Virtual Machine

1. Pull Datagrok image to docker `docker pull datagrok/datagrok:latest`
2. Prepare string `GROK_START_PARAMETERS`:
 ```
{
"amazonStorageRegion": "us-east-2",                             # S3 region
"amazonStorageBucket": "datagrok-test",                         # S3 bucket name
"amazonStorageId": "ACCOUNTID",                                 # S3 credential ID, Datagrok will resolve EC2 role if empty
"amazonStorageKey": "SECRETKEY",                                # S3 credential secret key, Datagrok will resolve EC2 role if empty
"dbServer": "datagrok-db-1.abc.us-east-2.rds.amazonaws.com",    # RDS endpoint
"db": "datagrok_docker",                                        # RDS new database name
"dbLogin": "datagrok_docker",                                   # RDS new user name, Datagrok will use it to connect to Postgres database
"dbPassword": "SoMeCoMpLeXpAsSwOrD",                            # RDS new user password, Datagrok will use it to connect to Postgres database
"dbAdminLogin": "postgres",                                     # RDS admin login
"dbAdminPassword": "postgres"                                   # RDS admin password
}
```
3. Run Datagrok image
`docker run -it -e GROK_PARAMETERS="<GROK_START_PARAMETERS>" -p 8080:8080 datagrok/datagrok:latest`
4. Check if Datagrok started successfully: http://HOST_NAME, login to Datagrok using username "admin" and password "SM9ekKEkZuBDp5eD"

## Setup Compute Virtual Machine

1. Pull CVM image `docker pull datagrok/cvm:latest`
2. Run CVM image `docker run -it -e GROK_COMPUTE_NUM_CORES=4 -p 8080:8080 -p 54321:54321 datagrok/cvm:latest`

Edit settings in the Datagrok (Tools | Settings...):
* Scripting:
    * CVM Url, CVM Url Client: http://CVM_URL:8080
    * API Url: http://DATAGROK_URL/api

See also:

  * [Compute VM](compute-vm.md)
  * [Architecture](architecture.md#application)
