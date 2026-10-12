"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DeleteUserModalProps } from "@/src/types/modals.interface";
import { Trash2Icon } from "lucide-react";

export function DeleteUserModal({ userId }: DeleteUserModalProps) {
	const handleDeleteUser = () => {
		console.log("delete user confirmed :>> ");
	};

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="destructive" size="icon">
						<Trash2Icon />
					</Button>
				}
			/>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete User</DialogTitle>
				</DialogHeader>

				<div className="px-4">
					<span>Are you sure you want to delete this user?</span>
				</div>

				<DialogFooter className="flex flex-row justify-start items-center gap-2">
					<DialogClose
						render={
							<Button variant="default" onClick={handleDeleteUser}>
								Yes
							</Button>
						}
					/>

					<DialogClose render={<Button variant="outline">Cancel</Button>} />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
