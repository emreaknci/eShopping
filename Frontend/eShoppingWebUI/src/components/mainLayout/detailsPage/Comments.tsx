import { Box, Typography, Rating, Divider, Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slider, Checkbox, FormControlLabel, FormHelperText } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CommentListDto } from '../../../dtos/comments/commentListDto';
import CommentService from '../../../services/comment.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CustomTextAreaComponent } from '../../common/CustomTextAreaComponent';
import { AuthContext } from '../../../contexts/AuthContext';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { CreateCommentDto } from '../../../dtos/comments/createCommentDto';
import { toast } from 'react-toastify';
import { JwtHelper } from '../../../utils/JwtHelper';
import StorageService from '../../../services/storage.service';
import { DialogComponent } from '../../common/DialogComponent';


const validationSchema = Yup.object({
    text: Yup.string().required('Yorum zorunludur'),
    rating: Yup.number().required('Puan zorunludur').min(1, 'Puan 1-5 arasında olmalıdır').max(5, 'Puan 1-5 arasında olmalıdır'),
    hideUserFullName: Yup.boolean().default(false),
});

const Comments = ({ productId, averageRating, setAverageRating }: { productId: number, averageRating: number, setAverageRating: any }) => {
    const [comments, setComments] = useState<CommentListDto[]>([]);
    const [ratings, setRatings] = useState<{ stars: number, percentage: number }[]>([]);
    const authContext = useContext(AuthContext);
    const [openAlert, setOpenAlert] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState<string>('');

    const calculateRatings = (comments: CommentListDto[]) => {
        const averageRating = parseFloat((comments.reduce((a, b) => a + b.rating, 0) / comments.length).toFixed(1));
        setAverageRating(averageRating);

        const ratingList = [];
        for (let i = 5; i >= 1; i--) {
            const ratingCount = comments.filter((comment) => comment.rating === i).length;
            ratingList.push({ stars: i, percentage: parseFloat(((ratingCount / comments.length) * 100).toFixed(1)) });
        }
        setRatings(ratingList);
    }
    useEffect(() => {
        const getComments = async (productId: number) => {
            await CommentService.getCommentsByProductId(productId)
                .then((response) => {
                    const comments = response.data as CommentListDto[];
                    setComments(comments);
                    calculateRatings(comments)
                })
                .catch((error) => {
                });
        };
        getComments(Number(productId));
    }, [productId]);

    const formik = useFormik({
        initialValues: {
            text: '',
            rating: 0,
            hideUserFullName: false,
        },
        validationSchema,
        onSubmit: (values) => {
            handleAddComment();
        },
    });

    const handleDeleteComment = async (commentId: string) => {
        setOpenAlert(true);
        setCurrentCommentId(commentId);
      
    }

    const handleAddComment = async () => {
        const dto: CreateCommentDto = {
            text: formik.values.text,
            rating: formik.values.rating,
            productId: productId,
            createdAt: new Date(),
            hideUserFullName: formik.values.hideUserFullName,
        };
        toast.dismiss();

        await CommentService.addComment(dto)
            .then((response) => {
                setComments([response.data, ...comments]);
                calculateRatings([response.data, ...comments]);
                toast.success("Yorumunuz başarıyla eklendi.");
                formik.resetForm();
            }).catch((error) => {
                toast.error(error.response.data ?? "Yorum eklenirken bir hata oluştu.");
            });
    }

    const handleConfirm = async () => {
          await CommentService.deleteComment(currentCommentId)
            .then((response) => {
                const newComments = comments.filter((comment) => comment.id !== currentCommentId);
                setComments(newComments);
                calculateRatings(newComments);
                toast.success("Yorum başarıyla silindi.");
            }).catch((error) => {
                console.log(error.response)
                toast.error(error.response.data ?? "Yorum silinirken bir hata oluştu.");
            });
        setOpenAlert(false);
    }

    return (
        <>
            <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                Yorumlar
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={5} xl={4} >
                    {comments.length != 0 && <Box mb={2}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Rating value={averageRating} precision={0.1} readOnly />
                            <Box ml={1}>Bu ürün ( {comments.length} ) {averageRating}/5 puan almıştır.</Box>
                        </Box>
                        {ratings.map((rating) => (
                            <Grid container spacing={3} alignItems="center" key={rating.stars}>
                                <Grid item xs={2}>
                                    <Typography>{rating.stars} Yıldız</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <LinearProgress value={rating.percentage} variant="determinate" />
                                </Grid>
                                <Grid item xs={2} justifyContent="flex-end">
                                    <Typography align="right">%{rating.percentage}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                    }
                    {comments.length === 0 && (
                        <Typography variant="body1" color="textSecondary">
                            Henüz yorum yapılmamış. Hemen ilk yorumu sen yap!
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12} md={6} lg={7} xl={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <Rating
                            name="rating"
                            value={formik.values.rating}
                            onChange={(event, newValue) => formik.setFieldValue('rating', newValue)}
                            disabled={!authContext.isAuthenticated}
                        />
                        <FormHelperText sx={{ color: "red" }}>{formik.touched.rating && formik.errors.rating}</FormHelperText>

                        <CustomTextAreaComponent
                            fieldName="text"
                            formik={formik}
                            label={authContext.isAuthenticated ? "Yorumunuzu bu alana yazabilirsiniz.." : "Yorum yapmak için giriş yapmalısınız."}
                            disabled={!authContext.isAuthenticated}
                        />
                        <FormHelperText sx={{ color: "red" }}>{formik.touched.text && formik.errors.text}</FormHelperText>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.hideUserFullName}
                                    onChange={(event) => formik.setFieldValue('hideUserFullName', event.target.checked)}
                                    disabled={!authContext.isAuthenticated}
                                />
                            }
                            label="Adım gizlensin"
                        />

                        <Button
                            variant="text"
                            fullWidth
                            color="primary"
                            onClick={() => formik.handleSubmit()}
                            disabled={!authContext.isAuthenticated}
                        >
                            Yorum Yap
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12}  >
                    {comments.map((comment, index) => (
                        <Box key={index} mb={2} mt={2}>
                            <Typography variant="h6" color="textPrimary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Rating value={comment.rating} precision={0.5} readOnly />
                                {JwtHelper.getTokenInfos(StorageService.getAccessToken()!).nameidentifier === comment.userId || authContext.isAdmin
                                    ?
                                    <Button variant="text" color="error" onClick={() => handleDeleteComment(comment.id)}>SİL</Button>
                                    : null
                                }
                            </Typography>
                            <Typography variant="h6" color="textPrimary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {comment.text}
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Tarih: {new Date(comment.createdAt).toLocaleString()}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {comment.userFullName}
                                </Typography>
                            </div>
                            <Divider style={{ marginTop: "1rem" }} />
                        </Box>
                    ))}
                </Grid>
                {openAlert && (
                    <DialogComponent
                        open={openAlert}
                        handleClose={() => setOpenAlert(false)}
                        handleConfirm={async () => await handleConfirm()}
                        text={"Bu yorumu kaldırmak istediğinize emin misiniz?"}
                    />
                )}

           </Grid>
        </>)

}

export default Comments

