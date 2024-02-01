// import logo from './logo.svg';
import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { addTodo, deleteTodo, getTodos } from "./components/todos";


import {
  Await,
  createBrowserRouter,
  defer,
  Form,
  Link,
  Outlet,
  RouterProvider,
  useAsyncError,
  useAsyncValue,
  useFetcher,
  useLoaderData,
  useNavigation,
  useParams,
  useRouteError,
} from "react-router-dom";
import './App.css';

import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';


import CharacterInfo from './components/CharacterInfo';
import DatapadFunctions from './components/DatapadFunctions';
import MainNavigation from './components/MainNavigation';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader: homeLoader,
        Component: Home,
      },
      {
        path: "todos",
        action: todosAction,
        loader: todosLoader,
        Component: TodosList,
        ErrorBoundary: TodosBoundary,
        children: [
          {
            path: ":id",
            loader: todoLoader,
            Component: Todo,
          },
        ],
      },
      {
        path: "deferred",
        loader: deferredLoader,
        Component: DeferredPage,
      },
      {
        path: "characters", Component: CharacterInfo
      },
      {path: "functions", Component: DatapadFunctions}
    ]
  },
]);

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  palette: {primary: {main: "#2B3442"}}
});
export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback/>} />;
}
export function Fallback() {
  return <p>Performing initial data load</p>;
}

// Layout
export function Layout() {
  // let navigation = useNavigation();
  // let revalidator = useRevalidator();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // let fetchers = useFetchers();
  // let fetcherInProgress = fetchers.some((f) =>
  //   ["loading", "submitting"].includes(f.state)
  // );

  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
          <li>
            <Link to="/deferred">Deferred</Link>
          </li>
          <li>
            <Link to="/404">404 Link</Link>
          </li>
          <li>
            <button onClick={() => revalidator.revalidate()}>
              Revalidate Data
            </button>
          </li>
        </ul>
      </nav> */}
      {/* <div style={{ position: "fixed", top: 0, right: 0 }}>
        {navigation.state !== "idle" && <p>Navigation in progress...</p>}
        {revalidator.state !== "idle" && <p>Revalidation in progress...</p>}
        {fetcherInProgress && <p>Fetcher in progress...</p>}
      </div> */}
      <hr />
      <ThemeProvider theme={theme}>
      <h1>Data Router Example</h1>

      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
                    <Link to="/">Home</Link>

        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

        {/* <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
      <List>
        {messages.map(({ primary, secondary, person }, index) => (
          <ListItemButton key={index + person}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItemButton>
        ))}
      </List> */}
        <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{backgroundColor: "primary.main", height: '100vh' }}
        >
          <Grid item xs={3}>
            <Outlet />
            <MainNavigation/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

// // Home
export async function homeLoader() {
  await sleep();
  return {
    date: new Date().toISOString(),
  };
}

export function Home() {
  let data = useLoaderData();
  return (
    <>
      <h2>Home</h2>
      <p>Date from loader: {data.date}</p>
    </>
  );
}

// Todos
export async function todosAction({ request }) {
  await sleep();

  let formData = await request.formData();

  // Deletion via fetcher
  if (formData.get("action") === "delete") {
    let id = formData.get("todoId");
    if (typeof id === "string") {
      deleteTodo(id);
      return { ok: true };
    }
  }

  // Addition via <Form>
  let todo = formData.get("todo");
  if (typeof todo === "string") {
    addTodo(todo);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/todos" },
  });
}

export async function todosLoader() {
  await sleep();
  return getTodos();
}

export function TodosList() {
  let todos = useLoaderData();
  let navigation = useNavigation();
  let formRef = React.useRef(null);

  // If we add and then we delete - this will keep isAdding=true until the
  // fetcher completes it's revalidation
  let [isAdding, setIsAdding] = React.useState(false);
  React.useEffect(() => {
    if (navigation.formData?.get("action") === "add") {
      setIsAdding(true);
    } else if (navigation.state === "idle") {
      setIsAdding(false);
      formRef.current?.reset();
    }
  }, [navigation]);

  return (
    <>
      <h2>Todos</h2>
      <p>
        This todo app uses a &lt;Form&gt; to submit new todos and a
        &lt;fetcher.form&gt; to delete todos. Click on a todo item to navigate
        to the /todos/:id route.
      </p>
      <ul>
        <li>
          <Link to="/todos/junk">
            Click this link to force an error in the loader
          </Link>
        </li>
        {Object.entries(todos).map(([id, todo]) => (
          <li key={id}>
            <TodoItem id={id} todo={todo} />
          </li>
        ))}
      </ul>
      <Form method="post" ref={formRef}>
        <input type="hidden" name="action" value="add" />
        <input name="todo"></input>
        <button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add"}
        </button>
      </Form>
      <Outlet />
    </>
  );
}

export function TodosBoundary() {
  let error = useRouteError();
  return (
    <>
      <h2>Error 💥</h2>
      <p>{error.message}</p>
    </>
  );
}

// interface TodoItemProps {
//   id: string;
//   todo: string;
// }

export function TodoItem({ id, todo }) {
  let fetcher = useFetcher();

  let isDeleting = fetcher.formData != null;
  return (
    <>
      <Link to={`/todos/${id}`}>{todo}</Link>
      &nbsp;
      <fetcher.Form method="post" style={{ display: "inline" }}>
        <input type="hidden" name="action" value="delete" />
        <button type="submit" name="todoId" value={id} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </fetcher.Form>
    </>
  );
}

// Todo
export async function todoLoader({
  params,
}) {
  await sleep();
  let todos = getTodos();
  if (!params.id) {
    throw new Error("Expected params.id");
  }
  let todo = todos[params.id];
  if (!todo) {
    throw new Error(`Uh oh, I couldn't find a todo with id "${params.id}"`);
  }
  return todo;
}

export function Todo() {
  let params = useParams();
  let todo = useLoaderData();
  return (
    <>
      <h2>Nested Todo Route:</h2>
      <p>id: {params.id}</p>
      <p>todo: {todo}</p>
    </>
  );
}

// Deferred Data
// interface DeferredRouteLoaderData {
//   critical1: string;
//   critical2: string;
//   lazyResolved: Promise<string>;
//   lazy1: Promise<string>;
//   lazy2: Promise<string>;
//   lazy3: Promise<string>;
//   lazyError: Promise<string>;
// }

const rand = () => Math.round(Math.random() * 100);
const resolve = (d, ms) =>
  new Promise((r) => setTimeout(() => r(`${d} - ${rand()}`), ms));
const reject = (d, ms) =>
  new Promise((_, r) =>
    setTimeout(() => {
      if (d instanceof Error) {
        d.message += ` - ${rand()}`;
      } else {
        d += ` - ${rand()}`;
      }
      r(d);
    }, ms)
  );

export async function deferredLoader() {
  return defer({
    critical1: await resolve("Critical 1", 250),
    critical2: await resolve("Critical 2", 500),
    lazyResolved: Promise.resolve("Lazy Data immediately resolved - " + rand()),
    lazy1: resolve("Lazy 1", 1000),
    lazy2: resolve("Lazy 2", 1500),
    lazy3: resolve("Lazy 3", 2000),
    lazyError: reject(new Error("Kaboom!"), 2500),
  });
}

export function DeferredPage() {
  let data = useLoaderData();
  return (
    <div>
      {/* Critical data renders immediately */}
      <p>{data.critical1}</p>
      <p>{data.critical2}</p>

      {/* Pre-resolved deferred data never triggers the fallback */}
      <React.Suspense fallback={<p>should not see me!</p>}>
        <Await resolve={data.lazyResolved}>
          <RenderAwaitedData />
        </Await>
      </React.Suspense>

      {/* Deferred data can be rendered using a component + the useAsyncValue() hook */}
      <React.Suspense fallback={<p>loading 1...</p>}>
        <Await resolve={data.lazy1}>
          <RenderAwaitedData />
        </Await>
      </React.Suspense>

      <React.Suspense fallback={<p>loading 2...</p>}>
        <Await resolve={data.lazy2}>
          <RenderAwaitedData />
        </Await>
      </React.Suspense>

      {/* Or you can bypass the hook and use a render function */}
      <React.Suspense fallback={<p>loading 3...</p>}>
        <Await resolve={data.lazy3}>{(data) => <p>{data}</p>}</Await>
      </React.Suspense>

      {/* Deferred rejections render using the useAsyncError hook */}
      <React.Suspense fallback={<p>loading (error)...</p>}>
        <Await resolve={data.lazyError} errorElement={<RenderAwaitedError />}>
          <RenderAwaitedData />
        </Await>
      </React.Suspense>
    </div>
  );
}

function RenderAwaitedData() {
  let data = useAsyncValue();
  return <p>{data}</p>;
}

function RenderAwaitedError() {
  let error = useAsyncError();
  return (
    <p style={{ color: "red" }}>
      Error (errorElement)!
      <br />
      {error.message} {error.stack}
    </p>
  );
}