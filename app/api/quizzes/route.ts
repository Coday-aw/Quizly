import Quiz from "@/app/models/QuizSchema";
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoDB";

interface QuizRequestBody {
  title: string;
  icon: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { title, icon, questions }: QuizRequestBody = await req.json();
    if (!title || !icon || !questions) {
      return NextResponse.json(
        { message: "Please provide all fields" },
        { status: 400 }
      );
    }
    await Quiz.create({ title, icon, questions });

    return NextResponse.json(
      { message: "Quiz created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating quiz" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const quiz = await Quiz.findById(id);

      if (!quiz) {
        return NextResponse.json(
          { message: "Quiz not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(quiz, { status: 200 });
    } else {
      const quizzes = await Quiz.find();
      return NextResponse.json(quizzes, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching quizzes" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const quiz = await Quiz.findById(id);

      if (!quiz) {
        return NextResponse.json(
          { message: "Quiz not found" },
          { status: 404 }
        );
      }

      await Quiz.deleteOne({ _id: id });

      return NextResponse.json(
        { messsage: "quiz delete successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting quiz" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Quiz id is requried" },
        { status: 400 }
      );
    }

    const updatedData = await req.json();

    if (!updatedData.title || !updatedData.icon || !updatedData.questions) {
      return NextResponse.json(
        { message: "Please fill all feilds" },
        { status: 400 }
      );
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "quiz update successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "error updating quiz" },
      { status: 500 }
    );
  }
}
