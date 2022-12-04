export async function handler(event: string, context: string) {
  console.log("stageName", process.env.stage);
  return {
    body: "hello from my first lambda",
    statusCode: 200,
  };
}
