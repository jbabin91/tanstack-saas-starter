CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "subscriptions_plan_status_idx" ON "subscriptions" USING btree ("plan","status");--> statement-breakpoint
CREATE INDEX "subscriptions_start_date_idx" ON "subscriptions" USING btree ("startDate");--> statement-breakpoint
CREATE INDEX "subscriptions_end_date_idx" ON "subscriptions" USING btree ("endDate");--> statement-breakpoint
CREATE INDEX "subscriptions_canceled_at_idx" ON "subscriptions" USING btree ("canceledAt");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_name_idx" ON "users" USING btree ("name");--> statement-breakpoint
CREATE INDEX "users_locale_idx" ON "users" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("createdAt");