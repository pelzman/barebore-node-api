"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataBase = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createDataBase = (req, res) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        let order = JSON.parse(data);
        //    create database folder and file
        const dataBaseFolder = path_1.default.join(__dirname, "database");
        const dataBaseFile = path_1.default.join(dataBaseFolder, "database.json");
        //  create dynamic database
        if (!fs_1.default.existsSync(dataBaseFolder)) {
            fs_1.default.mkdirSync(dataBaseFolder);
        }
        if (!fs_1.default.existsSync(dataBaseFile)) {
            fs_1.default.writeFileSync(dataBaseFile, "");
        }
        // return to database
        return fs_1.default.readFile(path_1.default.join(__dirname, "dataase/database.json"), "utf-8", (err, info) => {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "application/json",
                });
                res.end(JSON.stringify({
                    success: false,
                    error: err
                }));
            }
            else {
                let organization = [];
                try {
                    organization = JSON.parse(info);
                }
                catch (parseError) {
                    organization = [];
                }
                order.createdAt = new Date();
                order.noOfEmployees = order.employees.length;
                if (organization.length === 0) {
                    order.id = 1;
                }
                else {
                    let ids = organization.map((a => a.id));
                    let newId = Math.max(...ids);
                    order.id = newId + 1;
                }
                organization.push(order);
                fs_1.default.writeFile(path_1.default.join(__dirname, "database/database.json"), JSON.stringify(organization, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: false,
                            error: err
                        }));
                    }
                    else {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            success: true,
                            message: order
                        }));
                    }
                });
            }
        });
    });
};
exports.createDataBase = createDataBase;
