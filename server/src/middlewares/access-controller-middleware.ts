import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

export default function accessControllerMiddleware(req: Request, res: Response, next: NextFunction):void {
    const origin = getAccessControlAllowOrigin(req);
}

function getAccessControlAllowOrigin(req: Request): string {
    const allowed_origins = [
      "https://app.wimo.com", // Example when to publish to production 
    ];
    const origin = _.get(req, "headers.origin");
    const is_allowed = allowed_origins.includes(origin);
  
    if (is_allowed) {
      return origin;
    }
  
    if (process.env.ACCESS_CONTROL_ALLOW_ORIGIN) {
      return process.env.ACCESS_CONTROL_ALLOW_ORIGIN;
    }
  
    return process.env.DASHBOARD_URL && process.env.NODE_ENV === "production"
      ? process.env.DASHBOARD_URL
      : "http://localhost:3000"; // For localhost
  }
  