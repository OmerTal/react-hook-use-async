import { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Classic counter example to help understand the flow of this npm package
 *
 * @param    {() => Promise<T>} asyncFunction
 *           The async function we want to use as a hook
 *
 * @param    {Function} onSuccess
 *           The function representing the onSuccess callback from the main async function
 *
 * @param    {Object[]} renderOptions
 *           The array of render options, each member will be watched for changes and will cause re-render and re-calls of the async function (as in every classic hook)
 *
 * @param    {() => void} onFailure
 *           The function representing the onFailure callback from the main async function - not mandatory
 *
 * @param    {() => void[]} onFinally
 *           The function representing the onFinally callback from the main async function - not mandatory
 *
 * @example
 *   const ExampleComponent = () => {
 *     const [usersFromServer, setUsersFromServer] = useState<users[]>([]);
 *
 *     useAsync(getUsersFromServer, setUsersFromServer, [], () => {
 *         console.error("couldn't get users from server");
 *     });
 *
 *     return (
 *       <>
 *         {!usersFromServer || usersFromServer.length === 0 ? (
 *              <div>Loading...</div>
 *         ) : (
 *              <div>
 *                  Total users: {usersFromServer.length}
 *                  {usersFromServer.map((curUser) => (
 *                      <UserComponent user={curUser} />
 *                  ))}
 *              </div>
 *         )}
 *       </>
 *      );
 *    };
 */

export const useAsync = <T extends {}>(
  asyncFunction: () => Promise<T>,
  onSuccess: Function,
  renderOptions: Object[],
  onFailure?: () => void,
  onFinally?: () => void[]
) => {
  useEffect(() => {
    let isActive = true;
    if (!renderOptions.some((obj) => obj === undefined)) {
      asyncFunction()
        .then((data: Object) => {
          if (isActive) {
            onSuccess(data);
          }
        })
        .catch(() => {
          onFailure?.();
        })
        .finally(() => {
          onFinally?.();
        });
    }
    return () => {
      isActive = false;
    };
  }, [...renderOptions]);
};

useAsync.PropTypes = {
  asyncFunction: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  renderOptions: PropTypes.array.isRequired,
};

useAsync.defaultProps = {
  renderOptions: [],
};
