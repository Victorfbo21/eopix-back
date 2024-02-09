import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import User from "./users.entity";



@Injectable()
export default class UsersRepository extends Repository<User> { }