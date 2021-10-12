import { NextFunction, Request, Response, Router } from 'express';
import { createReportComment, createReportPost, deleteReport } from '../../services/reports.services';

export const postReports = Router()
export const commentReports = Router()

postReports
  .route('/:postid/report')

  // report a post
  .post(async (req, res) => {
    try {
      const createReport = await createReportPost(
        Number(req.params.postid),
        req.body,
      );
      res.status(200).json({ data: { createReport } });
    } catch (error) {
      res.status(400).end();
    }
  })

  // remove report status to a post
  .delete(async (req, res) => {
    try {
      const removeReport = await deleteReport(Number(req.params.postid));
    } catch (error) {
      res.status(400).end();
    }
  });

commentReports
  .route('/:commentid/report')

  // Report in a comment - ENDPOINT TESTED
  .post(async (req: Request, res: Response) => {
    try {
      const query = await createReportComment(
        Number(req.params.commentid),
        req.body,
      );
      res.status(201).json({ data: { query } });
    } catch (error) {
      res.status(400).end();
    }
  });
