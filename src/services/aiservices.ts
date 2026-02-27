import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.AIzaSyC5NNB-w9Iiy25GsPCT_na_0KRn0WJaMf8
);

export async function generateHolisticFeedback(data:any) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const result = await model.generateContent(
    `Analyze student performance and give holistic feedback:
     ${JSON.stringify(data)}`
  );

  return result.response.text();
}
