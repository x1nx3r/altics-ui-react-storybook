import type { Meta, StoryObj } from '@storybook/react-vite';
import { LinkButton } from '@altics/ui';
import { LinkButtonExamples } from '../examples/LinkButton.examples';

const meta = {
  title: 'Buttons/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: { text: 'Documentation', color: 'gray' },
};

export const Gallery: Story = {
  render: () => <LinkButtonExamples />,
};
