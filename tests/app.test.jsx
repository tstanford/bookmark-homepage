import {waitFor, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {vi, afterEach, beforeEach, describe, expect, test } from 'vitest'
import App from '../src/App'

describe('AppComponent', () => {
  beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(

          [
              {
                "id": 9,
                "name": "Home Lab",
                "bookmarks": [
                  {
                    "id": 9,
                    "title": "Cloudflare",
                    "url": "https://www.cloudflare.com/",
                    "favicon": ""
                  } 
                ]
              }
            ]

        ),
      })
    ));
  });  

  afterEach(() => {
    vi.resetAllMocks();
  });


  test('loads and renders page', async () => {
    window.env = {
      BMS_SERVICE_URL: "http://localhost:8080",
      BMS_SEARCH_URL: "https://google.com?q=",
      BMS_VERSION: "development build"
    };

    render(<App />);
    // await waitFor(() => screen.getByPlaceholderText('search'));
    
    // const footer = await screen.findByRole('copyright');
    // expect(footer).toHaveTextContent('Copyright ©2025 Tim Stanford');
  })
});