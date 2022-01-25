import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Display from "./Display";
import { resultImg, resultVideo, resultDateError } from "./mockedModels";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(resultImg),
  })
);

test("user enters app and photo is displayed", async () => {
  global.fetch.mockResolvedValueOnce(Promise.resolve({
    json: () => Promise.resolve(resultImg),
  }));
  render(<Display />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  const image = screen.getByTitle(/resTitle/i,);
  expect(image).toBeInTheDocument();
});

test("use enters app and video is displayed", async () => {
    global.fetch.mockResolvedValueOnce(Promise.resolve({
        json: () => Promise.resolve(resultVideo),
      }));
    render(<Display />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const video = screen.getByTitle(/resTitle/i,);
    expect(video).toBeInTheDocument();
  });

  test("shows error message", async () => {
    global.fetch.mockResolvedValueOnce(Promise.reject());
    render(<Display />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const message = screen.getByText(/There was an error, please try again./i,);
    expect(message).toBeInTheDocument();
  });

  test("shows date error message", async () => {
    global.fetch.mockResolvedValueOnce(Promise.resolve({
        json: () => Promise.resolve(resultDateError),
      }));
    render(<Display />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const message = screen.getByText(/Date must be between/i,);
    expect(message).toBeInTheDocument();
  });

  test("user selects date", async () => {
    global.fetch.mockResolvedValueOnce(Promise.resolve({
      json: () => Promise.resolve(resultImg),
    }));
    render(<Display />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const input = screen.getByTitle(/date/i);
    const button = screen.getByRole(/button/i, {name: "Show"});
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {target: {value: '2022-01-24'}})
    fireEvent.click(button);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
});
