import { ITokenReturn } from "../interfaces/ITokenReturn";

export class TokenReturn implements ITokenReturn{
  public success: boolean;

  constructor(success:boolean) {
    this.success =success;
  }
}
