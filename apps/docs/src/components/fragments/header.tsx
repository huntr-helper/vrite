import { mdiGithub } from "@mdi/js";
import type { Component } from "solid-js";
import { Button, IconButton } from "#components/primitives";
import { logoIcon } from "#icons/logo";
import { setMenuOpened, menuOpened } from "#lib/state";

const Header: Component = () => {
  return (
    <div class="top-0 bg-gray-100 dark:bg-gray-800 sticky left-0 z-50 items-end justify-center flex-1 w-full hidden md:flex">
      <div class="flex w-full justify-center items-center m-0 rounded-none p-1 border-b-2 dark:border-gray-700">
        <div class="flex-1" />
        <IconButton
          link="https://github.com/vriteio/vrite"
          variant="text"
          path={mdiGithub}
          label="Star on GitHub"
        ></IconButton>
        <Button color="primary" link="https://app.vrite.io">
          Sign in
        </Button>
      </div>
    </div>
  );
};

export { Header };
