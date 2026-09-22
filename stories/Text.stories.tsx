import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '@altics/ui';
import { TextExamples } from '../examples/Text.examples';

const meta = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: 'Accessible, token-based components.' },
};

export const Gallery: Story = {
  render: () => <TextExamples />,
};
