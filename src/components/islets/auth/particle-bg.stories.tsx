import { Meta, StoryObj } from "@storybook/react";
import ParticleBg from "./particle-bg";
const meta = {
  component: ParticleBg,
  title: "Islets/Auth/ParticleBg",
} as Meta;
export default meta;
type Story = StoryObj<typeof ParticleBg>;
export const Default: Story = {
  render: (props) => <ParticleBg {...props} />,
  args: {
    particleColors: ["#1d1e22", "#7d8087", "#5f6988"],
    maxRadius: 7,
    maxSpeed: 0.1,
    maxCount: 80,
  },
  argTypes: {
    particleColors: {
      control: {
        type: "object",
      },
    },
    maxRadius: {
      control: {
        type: "number",
      },
    },
    maxSpeed: {
      control: {
        type: "number",
      },
    },
    maxCount: {
      control: {
        type: "number",
      },
    },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
