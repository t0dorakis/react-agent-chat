/**
 * @param {string} question
 * @returns {Promise<string>}
 * @throws {Error}
 * @example
 * const answer = await chat("Hello")
 * console.log(answer) // "Hello, how are you?"
**/

export const chat = async (question: string) => {
  const url = process.env.REACT_APP_API_URL || '';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });
  try {
    const text = await response.text();
    return text
  } 
  catch (error) {
    console.log(error);
    return " A sorry... wasn't listening :shrug: could you repeat that?"
  }
};