***a little disclaimer: unfortunately, the UI/UX is a bit off. There are 3 main pages in the project. When you open the Render link, you will land on the Home page. From there, you can click on "Go to Recipes," which will take you to the Recipes Page. On this page, you'll find various dummy data recipes. If you click on the title of any dish, you will be directed to the individual Recipe Page for that particular dish.***

This project includes a React client and an Express server with a PostgreSQL database. I have implemented the core features, including a form for creating posts, routing with React Router, database schema design, and SQL queries to retrieve posts. Posts are fetched from the server and displayed dynamically using .map(), with dedicated pages for individual posts. Additionally, I have incorporated some stretch requirements, such as dynamic pages with react-router-dom, the ability to delete posts, and a like functionality.

I was unable to implement a dedicated route for categories in react-router-dom or additional SQL queries to filter posts. These features require more complex logic on both the server and client sides, as well as a more structured database setup. Given more time, I would focus on improving these aspects to enhance the overall functionality.

The biggest challenges were related to deployment, particularly configuring the repository correctly and hosting the project on Render. 
