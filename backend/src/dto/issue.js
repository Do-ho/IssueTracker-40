import { Transform } from "class-transformer";
import { IsArray, IsIn, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { ISSUESTATE } from "../common/type";

class AddIssueRequestBody {
    @IsString()
    title;

    @IsString()
    content;

    @IsOptional()
    @IsArray()
    assignees;

    @IsOptional()
    @IsArray()
    labels;

    @IsOptional()
    @IsNumber()
    milestone;
}

class GetIssuesRequestQuery {
    @IsOptional()
    @IsString()
    q;

    @Transform((value) => parseInt(value, 10))
    @IsNumber()
    page;
}

class GetIssueByIdParams {
    @Transform((value) => parseInt(value, 10))
    @IsNumber()
    issueId;
}

class ModifyIssueByIdBody {
    @IsOptional()
    @IsString()
    title;

    @IsOptional()
    @IsString()
    content;

    @IsOptional()
    @IsIn([ISSUESTATE.OPEN, ISSUESTATE.CLOSED])
    state;
}

class ModifyIssueByIdParams {
    @Transform((value) => parseInt(value, 10))
    @IsNumber()
    issueId;
}

class RemoveIssueByIdParams {
    @Transform((value) => parseInt(value, 10))
    @IsNumber()
    issueId;
}

class UserToIssueRequestParams {
    @IsNumberString()
    issueId;

    @IsNumberString()
    assigneeId;
}

class CreateReadCommentRequestParams {
    @IsNumberString()
    issueId;
}

class UpdateDeleteCommentRequestParams {
    @IsNumberString()
    issueId;

    @IsNumberString()
    commentId;
}

class AddCommentRequestBody {
    @IsString()
    content;
}

class IssueMilestoneRequestParams {
    @IsNumberString()
    issueId;

    @IsNumberString()
    milestoneId;
}

export {
    AddIssueRequestBody,
    UserToIssueRequestParams,
    CreateReadCommentRequestParams,
    AddCommentRequestBody,
    UpdateDeleteCommentRequestParams,
    IssueMilestoneRequestParams,
    GetIssuesRequestQuery,
    GetIssueByIdParams,
    ModifyIssueByIdBody,
    ModifyIssueByIdParams,
    RemoveIssueByIdParams
};
