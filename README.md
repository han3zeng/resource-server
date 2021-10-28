# resource-server

## Note
* authentication
    * restful API

* service
    * graphQL

* reason
    * I envision that only service related API will grow rapidly in the future. Therefore, only service related API may be benefited from the features of GraphQL
        * flexibility
            * design in data not view
        * efficiency
            * prevent from under / over fetching

## Response
* This is the overview of the implemented http response. Please check this [postman documentation](https://documenter.getpostman.com/view/18060759/UV5c8Zwt#intro) for detailed information.

#### Successfully Responses
* 200 (OK)
    * overview
        * miscellaneous
    * response
        * type
            ```typescript
              interface Response {
                ok: boolean;
                statusCode?: number;
                message: string;
                [String]: any;
              }
            ```
        * example
            ```JSON
              {
                "ok": true,
                "statusCode": 0,
                "message": "you have received blablabla successfully",
                "data": [],
              }
              ```

* 201 (Created)
    * overview
        * create story
    * response
        * type
            ```typescript
              interface Response {
                ok: boolean;
                statusCode?: number;
                message: string;
              }
            ```


* 204 (No Content)
    * overview
        * delete story
    * response
        * type
            ```typescript
              interface Response {
                ok: boolean;
                statusCode?: number;
                message: string;
              }
            ```


#### Client Error Response
* 401 (Unauthorized)
    * overview
        * the user has no valid accessToken to authenticate himself/herself
    * response
        * type
            ```typescript
                interface Response {
                  message: string;
                }
            ```

* 403 (Forbidden)
    * overview
        * the user has valid access token without valid csrf token
    * response
        * type
            ```typescript
                interface Response {
                  message: string;
                }
            ```

#### Server Error Response
* 500 (Internal Server Error)
    * overview
        * errors of this type should be logged to server
        * unexpected server error
    * response
        * type
            ```typescript
                interface Response {
                  message: string;
                  stackTrace: string;
                }
            ```
