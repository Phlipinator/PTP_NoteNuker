
export async function createImageText(ImageUrl: string) {
    const response = await fetch(`https://api.ocr.space/parse/image`, {
        method: 'POST',
        body: JSON.stringify({
          "url": "https://m.media-amazon.com/images/I/81D1ltT2rKL.png"
  
        }),
        headers: {
          "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
          "Content-Length": "<calculated when request is sent>",
          "Host": "<calculated when request is sent>",
          "User-Agent": "PostmanRuntime/7.32.3",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
          "apikey": "K84907859288957",
        },
      });
      return response.json();
  }
  
  
  
  export function parseString(input: string) {
    const result: Record<string, string> = {};
  
    // Regular expressions for matching the patterns
    const passwordPattern = /Password|PW|pw\s*=\s*"([^"]+)"/i;
    const serviceNamePattern = /Service\s*Name|Service|SN|sn\s*=\s*"([^"]+)"/i;
    const userNamePattern = /User\s*Name|User|UN|un\s*=\s*"([^"]+)"/i;
  
    // Try to match each pattern in the input string
    const passwordMatch = input.match(passwordPattern);
    const serviceNameMatch = input.match(serviceNamePattern);
    const userNameMatch = input.match(userNamePattern);
  
    // Extract and store the matched values in the result object
    if (passwordMatch) {
      result.Password = passwordMatch[1];
    }
  
    if (serviceNameMatch) {
      result.ServiceName = serviceNameMatch[1];
    }
  
    if (userNameMatch) {
      result.UserName = userNameMatch[1];
    }
    
    createDevices(result.ServiceName, result.UserName, result.Password);  //correct order? correct code position?
    //reload page/add to list
    return result;
  }
  
  /*
  // Example usage:
  const inputString = `
    Service Name = "MyService"
    User Name = "John Doe"
    Password="SecretPassword"
  `;
  
  const parsedData = parseString(inputString);
  console.log(parsedData);
  */
  
  
  
  //save to MongoDB
  export async function createDevices(DeviceName: string, OwnerName: string, Password: string) {
    const response = await fetch(`http://localhost:3000/devices`, {
        method: 'POST',
        body: JSON.stringify({
          DeviceName,
          OwnerName,
          Password
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
  }