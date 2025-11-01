# Feature List

- Bug: add bookmark dialog has an old URL use in the edit dialog

- Bug: add group dialog has an old name use in the edit dialog

- Bug: page not loading on LG smart TV

- Bug: login dialog is not centred vertically on Samsung TV

- Bug: add bookmark icon breaks out of container and right aligned to the document

- Bug: Cant click textbox of group name to position cursor at the start of the text as drag behaviour starts

- Bug: Onload (or refresh) there are 3 calls to amiadmin endpoint.

- hamburger menu on mobile device

- in admin view: Show list of users

- in admin view: change any password

- in admin view: create new user

- create some basic react tests and run them as part of pipeline

- experiment with different view types: list, small icons, large icons etc.. Can we allow the user the customise this per folder?

- error handling for drag and drop

- unit test moveBookmark

- integration test moveBookmark

- edit bookmark: change favicon

- change colour themes

- package bookmark-service and bookmark-homepage together as an all in one deployment

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




