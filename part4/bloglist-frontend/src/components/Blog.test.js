import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './SimpleBlog';

test('renders title', () => {
	const blog = {
		title: 'Winds of Winter',
		author: 'Jesus Christ',
		url: 'localhost'
	};

	const component = render(<Blog blog={blog} />);

	expect(component.container).toHaveTextContent('Winds of Winter');
});

test('clicking the button twice,  calls eventhandler twicce ', () => {
	const blog = {
		title: 'Toit on hea, kala veel parem',
		author: 'Andrei Redi'
	};
	const mockHandler = jest.fn();

	const { getByText } = render(<Blog blog={blog} onClick={mockHandler} />);

	const button = getByText('like');
	fireEvent.click(button);
	fireEvent.click(button);

	expect(mockHandler.mock.calls.length).toBe(2);
});
