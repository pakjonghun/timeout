import { GetRecordByDayRequest } from "./../../../libs/client/types/dataTypes";
import { pageTake } from "@libs/server/constants";
import withMethod from "@libs/server/withMethod";
import withCookie from "@libs/server/withCookie";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import client from "@libs/server/client";
import { GetRecordByDayResponse } from "@libs/server/types/dataTypes";
import { addDays } from "date-fns";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetRecordByDayResponse>
) => {
  const userRole = req.session.user?.role;

  if (userRole !== "ADMIN") {
    return res.status(400).json({ success: false });
  }

  const {
    dates,
    startDate,
    endDate,
    keyWord,
    page,
    day = "desc",
  } = req.query as GetRecordByDayRequest;

  let beforeDate = startDate;
  let afterDate = endDate;

  if (startDate && endDate) {
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    if (startTime > endTime) {
      beforeDate = endDate;
      afterDate = startDate;
    }
  }

  if (!page) return res.status(400).json({ success: false });

  const OR = [] as { createdAt: { gte: Date; lte: Date } }[];

  if (dates) {
    const parsed = JSON.parse(dates.toString()) as string[];
    parsed.forEach((date) => {
      const obj = {
        createdAt: {
          gte: new Date(date),
          lte: addDays(new Date(date), 1),
        },
      };

      OR.push(obj);
    });
  }

  const records = await client.workTimes.groupBy({
    by: ["day"],
    where: {
      user: {
        name: keyWord,
      },
      ...(beforeDate && {
        createdAt: {
          gte: new Date(beforeDate),
        },
      }),
      ...(afterDate && {
        createdAt: {
          lte: addDays(new Date(afterDate), 1),
        },
      }),
      ...(OR.length && { OR }),
    },
    _count: {
      end: true,
      start: true,
    },
    _avg: {
      duration: true,
    },
    skip: (+page - 1) * pageTake,
    take: pageTake,

    orderBy: {
      day,
    },
  });

  const totalPage = Math.ceil(records.length / pageTake);
  res.json({ success: true, records, totalPage });
};

export default withCookie(
  withMethod({
    methods: ["GET"],
    handler,
  })
);
