# React UseAsync Hook

A Custom React hook for any asynchronous usages, including interacting with server side in the most efficient way.

## Example usage

```js
   import { useAsync } from "@omer-tal/react-hook-use-async";
   import axios from 'axios';

   const getUsersFromServer = async (): Promise<user[]> => {
     return await axios
      .get(`myServerPath`)
      .then((res) => res.data)
      .catch((reason) => {
         console.error(reason);
        throw reason;
     });
   };

   const ExampleComponent = () => {
     const [usersFromServer, setUsersFromServer] = useState<user[]>([]);

     useAsync(getUsersFromServer, setUsersFromServer, [], () => {
         console.error("couldn't get users from server");
     });

     return (
       <>
         {!usersFromServer || usersFromServer.length === 0 ? (
              <div>Loading...</div>
         ) : (
              <div>
                  Total users: {usersFromServer.length}
                  {usersFromServer.map((curUser) => (
                      <UserComponent user={curUser} />
                  ))}
              </div>
         )}
       </>
      );
     };
```
