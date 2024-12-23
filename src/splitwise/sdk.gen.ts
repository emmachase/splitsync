// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-fetch';
import type { GetGetCurrentUserData, GetGetCurrentUserError, GetGetCurrentUserResponse, GetGetUserByIdData, GetGetUserByIdError, GetGetUserByIdResponse, PostUpdateUserByIdData, PostUpdateUserByIdError, PostUpdateUserByIdResponse, GetGetGroupsData, GetGetGroupsError, GetGetGroupsResponse, GetGetGroupByIdData, GetGetGroupByIdError, GetGetGroupByIdResponse, PostCreateGroupData, PostCreateGroupError, PostCreateGroupResponse, PostDeleteGroupByIdData, PostDeleteGroupByIdError, PostDeleteGroupByIdResponse, PostUndeleteGroupByIdData, PostUndeleteGroupByIdError, PostUndeleteGroupByIdResponse, PostAddUserToGroupData, PostAddUserToGroupResponse, PostRemoveUserFromGroupData, PostRemoveUserFromGroupResponse, GetGetFriendsData, GetGetFriendsError, GetGetFriendsResponse, GetGetFriendByIdData, GetGetFriendByIdError, GetGetFriendByIdResponse, PostCreateFriendData, PostCreateFriendError, PostCreateFriendResponse, PostCreateFriendsData, PostCreateFriendsError, PostCreateFriendsResponse, PostDeleteFriendByIdData, PostDeleteFriendByIdError, PostDeleteFriendByIdResponse, GetGetCurrenciesData, GetGetCurrenciesResponse, GetGetExpenseByIdData, GetGetExpenseByIdError, GetGetExpenseByIdResponse, GetGetExpensesData, GetGetExpensesError, GetGetExpensesResponse, PostCreateExpenseData, PostCreateExpenseError, PostCreateExpenseResponse, PostUpdateExpenseByIdData, PostUpdateExpenseByIdError, PostUpdateExpenseByIdResponse, PostDeleteExpenseByIdData, PostDeleteExpenseByIdError, PostDeleteExpenseByIdResponse, PostUndeleteExpenseByIdData, PostUndeleteExpenseByIdError, PostUndeleteExpenseByIdResponse, GetGetCommentsData, GetGetCommentsError, GetGetCommentsResponse, PostCreateCommentData, PostCreateCommentError, PostCreateCommentResponse, PostDeleteCommentByIdData, PostDeleteCommentByIdError, PostDeleteCommentByIdResponse, GetGetNotificationsData, GetGetNotificationsError, GetGetNotificationsResponse, GetGetCategoriesData, GetGetCategoriesResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Get information about the current user
 */
export const getGetCurrentUser = <ThrowOnError extends boolean = false>(options?: Options<GetGetCurrentUserData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetCurrentUserResponse, GetGetCurrentUserError, ThrowOnError>({
        ...options,
        url: '/get_current_user'
    });
};

/**
 * Get information about another user
 */
export const getGetUserById = <ThrowOnError extends boolean = false>(options: Options<GetGetUserByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetUserByIdResponse, GetGetUserByIdError, ThrowOnError>({
        ...options,
        url: '/get_user/{id}'
    });
};

/**
 * Update a user
 */
export const postUpdateUserById = <ThrowOnError extends boolean = false>(options: Options<PostUpdateUserByIdData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostUpdateUserByIdResponse, PostUpdateUserByIdError, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/update_user/{id}'
    });
};

/**
 * List the current user's groups
 * **Note**: Expenses that are not associated with a group are listed in a group with ID 0.
 *
 */
export const getGetGroups = <ThrowOnError extends boolean = false>(options?: Options<GetGetGroupsData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetGroupsResponse, GetGetGroupsError, ThrowOnError>({
        ...options,
        url: '/get_groups'
    });
};

/**
 * Get information about a group
 */
export const getGetGroupById = <ThrowOnError extends boolean = false>(options: Options<GetGetGroupByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetGroupByIdResponse, GetGetGroupByIdError, ThrowOnError>({
        ...options,
        url: '/get_group/{id}'
    });
};

/**
 * Create a group
 * Creates a new group. Adds the current user to the group by default.
 *
 * **Note**: group user parameters must be flattened into the format `users__{index}__{property}`, where
 * `property` is `user_id`, `first_name`, `last_name`, or `email`.
 * The user's email or ID must be provided.
 *
 */
export const postCreateGroup = <ThrowOnError extends boolean = false>(options: Options<PostCreateGroupData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostCreateGroupResponse, PostCreateGroupError, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/create_group'
    });
};

/**
 * Delete a group
 * Delete an existing group. Destroys all associated records (expenses, etc.)
 */
export const postDeleteGroupById = <ThrowOnError extends boolean = false>(options: Options<PostDeleteGroupByIdData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostDeleteGroupByIdResponse, PostDeleteGroupByIdError, ThrowOnError>({
        ...options,
        url: '/delete_group/{id}'
    });
};

/**
 * Restore a group
 * Restores a deleted group.
 *
 * **Note**: 200 OK does not indicate a successful response. You must check the `success` value of the response.
 *
 */
export const postUndeleteGroupById = <ThrowOnError extends boolean = false>(options: Options<PostUndeleteGroupByIdData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostUndeleteGroupByIdResponse, PostUndeleteGroupByIdError, ThrowOnError>({
        ...options,
        url: '/undelete_group/{id}'
    });
};

/**
 * Add a user to a group
 * **Note**: 200 OK does not indicate a successful response. You must check the `success` value of the response.
 *
 */
export const postAddUserToGroup = <ThrowOnError extends boolean = false>(options: Options<PostAddUserToGroupData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostAddUserToGroupResponse, unknown, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/add_user_to_group'
    });
};

/**
 * Remove a user from a group
 * Remove a user from a group. Does not succeed if the user has a non-zero balance.
 *
 * **Note:** 200 OK does not indicate a successful response. You must check the success value of the response.
 *
 */
export const postRemoveUserFromGroup = <ThrowOnError extends boolean = false>(options: Options<PostRemoveUserFromGroupData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostRemoveUserFromGroupResponse, unknown, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/remove_user_from_group'
    });
};

/**
 * List current user's friends
 * **Note**: `group` objects only include group balances with that friend.
 *
 */
export const getGetFriends = <ThrowOnError extends boolean = false>(options?: Options<GetGetFriendsData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetFriendsResponse, GetGetFriendsError, ThrowOnError>({
        ...options,
        url: '/get_friends'
    });
};

/**
 * Get details about a friend
 */
export const getGetFriendById = <ThrowOnError extends boolean = false>(options: Options<GetGetFriendByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetFriendByIdResponse, GetGetFriendByIdError, ThrowOnError>({
        ...options,
        url: '/get_friend/{id}'
    });
};

/**
 * Add a friend
 * Adds a friend. If the other user does not exist, you must supply `user_first_name`.
 * If the other user exists, `user_first_name` and `user_last_name` will be ignored.
 *
 */
export const postCreateFriend = <ThrowOnError extends boolean = false>(options: Options<PostCreateFriendData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostCreateFriendResponse, PostCreateFriendError, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/create_friend'
    });
};

/**
 * Add friends
 * Add multiple friends at once.
 *
 * For each user, if the other user does not exist, you must supply `friends__{index}__first_name`.
 *
 * **Note**: user parameters must be flattened into the format `friends__{index}__{property}`, where
 * `property` is `first_name`, `last_name`, or `email`.
 *
 */
export const postCreateFriends = <ThrowOnError extends boolean = false>(options: Options<PostCreateFriendsData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostCreateFriendsResponse, PostCreateFriendsError, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/create_friends'
    });
};

/**
 * Delete friendship
 * Given a friend ID, break off the friendship between the current user and the specified user.
 *
 * **Note**: 200 OK does not indicate a successful response. You must check the `success` value of the response.
 *
 */
export const postDeleteFriendById = <ThrowOnError extends boolean = false>(options: Options<PostDeleteFriendByIdData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostDeleteFriendByIdResponse, PostDeleteFriendByIdError, ThrowOnError>({
        ...options,
        url: '/delete_friend/{id}'
    });
};

/**
 * Supported currencies
 * Returns a list of all currencies allowed by the system. These are mostly ISO 4217 codes, but we do
 * sometimes use pending codes or unofficial, colloquial codes (like BTC instead of XBT for Bitcoin).
 *
 */
export const getGetCurrencies = <ThrowOnError extends boolean = false>(options?: Options<GetGetCurrenciesData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetCurrenciesResponse, unknown, ThrowOnError>({
        ...options,
        url: '/get_currencies'
    });
};

/**
 * Get expense information
 */
export const getGetExpenseById = <ThrowOnError extends boolean = false>(options: Options<GetGetExpenseByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetExpenseByIdResponse, GetGetExpenseByIdError, ThrowOnError>({
        ...options,
        url: '/get_expense/{id}'
    });
};

/**
 * List the current user's expenses
 */
export const getGetExpenses = <ThrowOnError extends boolean = false>(options?: Options<GetGetExpensesData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetExpensesResponse, GetGetExpensesError, ThrowOnError>({
        ...options,
        url: '/get_expenses'
    });
};

/**
 * Create an expense
 * Creates an expense. You may either split an expense equally (only with `group_id` provided),
 * or supply a list of shares.
 *
 * When splitting equally, the authenticated user is assumed to be the payer.
 *
 * When providing a list of shares, each share must include `paid_share` and `owed_share`, and must be identified by one of the following:
 * - `email`, `first_name`, and `last_name`
 * - `user_id`
 *
 * **Note**: 200 OK does not indicate a successful response. The operation was successful only if `errors` is empty.
 *
 */
export const postCreateExpense = <ThrowOnError extends boolean = false>(options: Options<PostCreateExpenseData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostCreateExpenseResponse, PostCreateExpenseError, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/create_expense'
    });
};

/**
 * Update an expense
 * Updates an expense. Parameters are the same as in `create_expense`, but you only need to include parameters
 * that are changing from the previous values. If any values is supplied for `users__{index}__{property}`, _all_
 * shares for the expense will be overwritten with the provided values.
 *
 * **Note**: 200 OK does not indicate a successful response. The operation was successful only if `errors` is empty.
 *
 */
export const postUpdateExpenseById = <ThrowOnError extends boolean = false>(options: Options<PostUpdateExpenseByIdData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostUpdateExpenseByIdResponse, PostUpdateExpenseByIdError, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/update_expense/{id}'
    });
};

/**
 * Delete an expense
 * **Note**: 200 OK does not indicate a successful response. The operation was successful only if `success` is true.
 *
 */
export const postDeleteExpenseById = <ThrowOnError extends boolean = false>(options: Options<PostDeleteExpenseByIdData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostDeleteExpenseByIdResponse, PostDeleteExpenseByIdError, ThrowOnError>({
        ...options,
        url: '/delete_expense/{id}'
    });
};

/**
 * Restore an expense
 * **Note**: 200 OK does not indicate a successful response. The operation was successful only if `success` is true.
 *
 */
export const postUndeleteExpenseById = <ThrowOnError extends boolean = false>(options: Options<PostUndeleteExpenseByIdData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostUndeleteExpenseByIdResponse, PostUndeleteExpenseByIdError, ThrowOnError>({
        ...options,
        url: '/undelete_expense/{id}'
    });
};

/**
 * Get expense comments
 */
export const getGetComments = <ThrowOnError extends boolean = false>(options: Options<GetGetCommentsData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetCommentsResponse, GetGetCommentsError, ThrowOnError>({
        ...options,
        url: '/get_comments'
    });
};

/**
 * Create a comment
 */
export const postCreateComment = <ThrowOnError extends boolean = false>(options: Options<PostCreateCommentData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostCreateCommentResponse, PostCreateCommentError, ThrowOnError>({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/create_comment'
    });
};

/**
 * Delete a comment
 * Deletes a comment. Returns the deleted comment.
 */
export const postDeleteCommentById = <ThrowOnError extends boolean = false>(options: Options<PostDeleteCommentByIdData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostDeleteCommentByIdResponse, PostDeleteCommentByIdError, ThrowOnError>({
        ...options,
        url: '/delete_comment/{id}'
    });
};

/**
 * Get notifications
 * Return a list of recent activity on the users account with the most recent items first.
 * `content` will be suitable for display in HTML and uses only the `<strong>`, `<strike>`, `<small>`,
 * `<br>` and `<font color="#FFEE44">` tags.
 *
 * The `type` value indicates what the notification is about. Notification types may be added in the future
 * without warning. Below is an incomplete list of notification types.
 *
 * | Type | Meaning |
 * | ---- | ------- |
 * | 0    | Expense added |
 * | 1    | Expense updated |
 * | 2	   | Expense deleted |
 * | 3	   | Comment added |
 * | 4	   | Added to group |
 * | 5	   | Removed from group |
 * | 6	   | Group deleted |
 * | 7	   | Group settings changed |
 * | 8	   | Added as friend |
 * | 9	   | Removed as friend |
 * | 10	 | News (a URL should be included) |
 * | 11	 | Debt simplification |
 * | 12	 | Group undeleted |
 * | 13	 | Expense undeleted |
 * | 14	 | Group currency conversion |
 * | 15	 | Friend currency conversion |
 *
 * **Note**: While all parameters are optional, the server sets arbitrary (but large) limits
 * on the number of notifications returned if you set a very old `updated_after` value or `limit` of `0` for a
 * user with many notifications.
 *
 */
export const getGetNotifications = <ThrowOnError extends boolean = false>(options?: Options<GetGetNotificationsData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetNotificationsResponse, GetGetNotificationsError, ThrowOnError>({
        ...options,
        url: '/get_notifications'
    });
};

/**
 * Supported categories
 * Returns a list of all categories Splitwise allows for expenses. There are parent categories that represent groups of categories with subcategories for more specific categorization.
 * When creating expenses, you must use a subcategory, not a parent category.
 * If you intend for an expense to be represented by the parent category and nothing more specific, please use the "Other" subcategory.
 *
 */
export const getGetCategories = <ThrowOnError extends boolean = false>(options?: Options<GetGetCategoriesData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetGetCategoriesResponse, unknown, ThrowOnError>({
        ...options,
        url: '/get_categories'
    });
};