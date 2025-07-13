import { render, screen } from "@testing-library/react";
import Expenses from "./Expenses";
import { Provider } from "react-redux";
import store from "../store/index";


describe("Expenses Component",()=>{

  test("renders 'All Expenses' heading", () => {
    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    );
  
    const heading = screen.getByText("All Expenses");
    expect(heading).toBeInTheDocument();
  });
  
  test("render expenses if req success", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok:true,
      json: async () => ({
  
        exp1: {
          amount: '200',
          description: "Test expense",
          category: "Food",
        },
      }),
    });
  
    render(
      <Provider store={store}>
        <Expenses />
      </Provider>
    );
    const amountText = await screen.findByText("200",{exact:false});
    expect(amountText).toBeInTheDocument()
  });


})


