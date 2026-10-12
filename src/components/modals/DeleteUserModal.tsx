"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteUser } from "@/src/actions/users";
import { toast } from "sonner";
import { DeleteUserModalProps } from "@/src/types/modals.interface";

export function DeleteUserModal({ userId, userName, userEmail }: DeleteUserModalProps) {
	const [open, setOpen] = useState(false);

	const avatarText = userName.trim().charAt(0).toUpperCase();

	const { mutate: handleDeleteUser, isPending } = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			toast.success("User deleted successfully!");

			setOpen(false);
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to delete user!");
		},
	});

	return (
		<Dialog
			open={open}
			onOpenChange={(nextOpen) => {
				if (isPending) return;

				setOpen(nextOpen);
			}}>
			<DialogTrigger
				render={
					<Button variant="destructive" size="icon" aria-label="Delete user">
						<Trash2Icon />
					</Button>
				}
			/>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete User</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col justify-center items-center gap-4 px-4">
					<p>Are you sure you want to delete this user?</p>

					<div className="flex w-full max-w-md items-center justify-between rounded-xl border p-4">
						<div className="flex items-center gap-3">
							<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
								{avatarText}
							</div>

							<div className="min-w-0">
								<p className="truncate font-medium">{userName}</p>

								<p className="truncate text-sm text-muted-foreground">{userEmail}</p>
							</div>
						</div>
					</div>
				</div>

				<DialogFooter className="flex flex-row justify-start items-center gap-2">
					<Button variant="destructive" onClick={() => handleDeleteUser(userId)} disabled={isPending}>
						Delete
						{isPending && <LoaderIcon data-icon="inline-end" className="animate-spin" />}
					</Button>

					<DialogClose
						render={
							<Button variant="outline" disabled={isPending}>
								Cancel
							</Button>
						}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
