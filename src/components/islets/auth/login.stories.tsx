import { Meta, StoryObj } from "@storybook/react";
import Login from "./login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta: Meta = {
  title: "Islets/Auth/Login",
  component: Login,
};
export default meta;

type Story = StoryObj<typeof Login>;
export const Template: Story = {
  render: () => <Login />,
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <div className="flex h-screen items-center justify-center">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],

  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
