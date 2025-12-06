# Backlog

- Bug: page not loading on LG smart TV

- Bug: login dialog is not centred vertically on Samsung TV

- Refactor: extract all API calls in bookmarkspage to a new BookmarksController class.

- when admin user logs in for first time. force a password change. 

- add touch events for mobile. drag folders, drag icons.

- implement jwt refresh tokens

- hamburger menu on mobile device

- profile icon using gravatar

- bookmark-service: make sure that jwt token contains the users roles

- in admin view: show the time of the users last activity

- in admin view: when adding a user with a duplicate username, show an error rather than silently shallowing the 500 response.

- in admin view: change any password

- in admin view: delete a user

- in admin view: edit a user.

- create some basic react tests and run them as part of pipeline

- experiment with different view types: list, small icons, large icons etc.. Can we allow the user the customise this per folder?

- error handling for drag and drop

- unit test moveBookmark

- unit test moveGroup

- integration test moveBookmark

- integration test moveGroup

- change colour themes

- package bookmark-service and bookmark-homepage together as an all in one deployment

- Bug : A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components react-dom-client.development.js:20854:22

- ~~Bug: its is possible to drag an item onto a folder when not in edit mode.~~

- ~~Bug: Mobile: fixed background shows white underlying background on scroll.~~

- ~~Bug: add bookmark dialog has an old URL use in the edit dialog~~

- ~~Bug: add group dialog has an old name use in the edit dialog~~

- ~~folder icons: zoom trasition on mouse over.~~

- ~~edit bookmark: change favicon~~

- ~~Bug: Onload (or refresh) there are 3 calls to amiadmin endpoint.~~

- ~~Bug: Cant click textbox of group name to position cursor at the start of the text as drag behaviour starts~~

- ~~Only make folders draggable using a drag handle~~

- ~~Bug: add bookmark icon breaks out of container and right aligned to the document~~

- ~~in admin view: Show list of users~~

- ~~in admin view: create new user~~

- ~~Bookmark service: fix integration tests with login and use bearer token~~

- ~~Bug: when searching, all folders still show. should only show folders with found bookmarks.~~

- ~~Introduce role base security, with admin users and separate admin screen when logging in.~~

- ~~Bug: Drag and drop showing not allowed cursor~~

- ~~Bug IsAdmin variable can be tampered with in local storage resulting in ability to view admin section without the role.~~

- ~~Bug: when folder drag over the top of itself it results in a api call where source and target are the same.~~

- ~~Allow reordering of groups using drag and drop~~

- ~~add new group~~

- ~~refresh data on add new bookmark~~

- ~~refresh data on add new group~~

- ~~containerise the application~~

- ~~refactor dialogs into new components~~

- ~~Drag and drop links from one group to another~~

- ~~allow drag and drop of urls from browser, popup add new bookmark dialog~~

- ~~edit mode~~

- ~~change edit button toggle to switch~~

- ~~delete bookmark by clicking the bin badge on the icon~~

- ~~get search working~~

- ~~setup jenkins pipeline for ci/cd - no k8s deployment yet~~

- ~~create helm chart for bookmark-homepage~~

- ~~update jenkins pipeline to deploy to k8s.~~

- ~~responsive mode for mobile browsing~~

- ~~folder titles are jumping about in edit mode~~

- ~~rename group~~

- ~~delete group~~

- ~~export bookmarks to yaml file~~

- ~~migrate project to something newer~~

- ~~replace reach dialog with standard one~~

- ~~Change dockerfile to use environment variables for service url. when it starts the container, it should edit the urls in the code.~~

- ~~Add footer with github link and build number~~

- ~~edit bookmark~~
    - ~~change name~~
    - ~~change url~~

- ~~delete bookmark by clicking delete in the edit dialog~~

- ~~add git tagging to pipeline~~

- ~~file upload option~~

- ~~authentication~~
    ~~- register~~
    ~~- login~~
    ~~- logout~~

- ~~Custom bookmarks per user~~

- ~~Bug: CORS error when opening edit dialog. local only.~~




